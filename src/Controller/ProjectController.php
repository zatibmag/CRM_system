<?php

namespace App\Controller;

use App\Entity\Project;
use App\Form\ProjectType;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;

#[Route('/project')]
class ProjectController extends AbstractController
{
    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    #[Route('/', name: 'app_project_index', methods: ['GET'])]
    public function index(ProjectRepository $projectRepository): JsonResponse
    {
        $projects = $projectRepository->findAll();

        $projectsArray = [];
        foreach ($projects as $project) {
            $projectsArray[] = [
                'id' => $project->getId(),
                'name' => $project->getProjectName(),
                'projectType' => $project->getProjectType(),
                'startDate' => $project->getStartDate(),
                'endDate' => $project->getEndDate(),
                'status' => $project->getStatus(),
                'comment' => $project->getComment()
            ];
        }

        return new JsonResponse($projectsArray);
    }

    #[Route('/project-types', name: 'project-types', methods: ['POST'])]
    public function project_types(): JsonResponse
    {
        return new JsonResponse(Project::PROJECT_TYPES);
    }

    #[Route('/status-choice', name: 'status-choise', methods: ['POST'])]
    public function status_choice(): JsonResponse
    {
        return new JsonResponse(Project::STATUS_CHOICE);
    }


    #[Route('/new', name: 'app_project_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $csrfToken = new CsrfToken('project_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }

        $project = new Project();
        $form = $this->createForm(ProjectType::class, $project);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($project);
            $entityManager->flush();

            return new JsonResponse(JsonResponse::HTTP_CREATED);
        }

        return new JsonResponse(JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/csrf-token-form', name: 'app_csrf_token_form', methods: ['GET'])]
    public function getCsrfTokenForm(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('project_form')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/csrf-token-delete', name: 'app_csrf_token_delete', methods: ['GET'])]
    public function getCsrfTokenDelete(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete_project')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/{id}', name: 'app_project_show', methods: ['GET'])]
    public function show(Project $project): Response
    {
        return $this->render('project/show.html.twig', [
            'project' => $project,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_project_edit', methods: ['PUT'])]
    public function edit(Request $request, Project $project, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('project_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }

        $form = $this->createForm(ProjectType::class, $project);
        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse(JsonResponse::HTTP_OK);
        }

        return new JsonResponse(JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}/delete', name: 'app_project_delete', methods: ['DELETE'])]
    public function delete(Request $request, Project $project, EntityManagerInterface $entityManager): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete'.$project->getId())->getValue();
    
        if (!$this->isCsrfTokenValid('delete'.$project->getId(), $csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }
    
        $entityManager->remove($project);
        $entityManager->flush();
    
        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }
}
