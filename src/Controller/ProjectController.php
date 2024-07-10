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

    #[Route('/status-choise', name: 'status-choise', methods: ['POST'])]
    public function status_choise(): JsonResponse
    {
        return new JsonResponse(Project::STATUS_CHOISE);
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

    #[Route('/csrf-token', name: 'app_csrf_token', methods: ['GET'])]
    public function getCsrfToken(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('project_form')->getValue();
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

    #[Route('/{id}', name: 'app_project_delete', methods: ['POST'])]
    public function delete(Request $request, Project $project, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$project->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($project);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_project_index', [], Response::HTTP_SEE_OTHER);
    }
}
