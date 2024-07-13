<?php

namespace App\Controller;

use App\Entity\LeaveRequest;
use App\Form\LeaveRequestType;
use App\Repository\LeaveRequestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;

#[Route('/leave-request')]
class LeaveRequestController extends AbstractController
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
                'leaveRequestName' => $project->getProjectName(),
                'leaveRequestEmployee' => $project->getProjectType(),
                'startDate' => $project->getStartDate(),
                'endDate' => $project->getEndDate(),
                'employee' => $project->getEmployee(),
                'status' => $project->getStatus(),
                'comment' => $project->getComment()
            ];
        }

        return new JsonResponse($projectsArray);
    }

    #[Route('/absence-reason', name: 'absenceReason', methods: ['GET'])]
    public function absenceReason(): JsonResponse
    {
        return new JsonResponse(LeaveRequest::ABSENCE_REASON);
    }

    #[Route('/new', name: 'app_leave_request_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $csrfToken = new CsrfToken('leave_request_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }

        $leaveRequest = new LeaveRequest();
        $form = $this->createForm(LeaveRequestType::class, $leaveRequest);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($leaveRequest);
            $entityManager->flush();

            return new JsonResponse(JsonResponse::HTTP_CREATED);
        }

        return new JsonResponse(JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/csrf-token-form-leavel-request', name: 'app_csrf_token_form_leave_request', methods: ['GET'])]
    public function getCsrfTokenForm(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('leave_request_form')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/csrf-token-delete-leavel-request', name: 'app_csrf_token_delete_leave_request', methods: ['GET'])]
    public function getCsrfTokenDelete(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete_leave_request')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/{id}', name: 'app_leave_request_show', methods: ['GET'])]
    public function show(LeaveRequest $leaveRequest): Response
    {
        return $this->render('leave_request/show.html.twig', [
            'leave_request' => $leaveRequest,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_leave_request_edit', methods: ['PUT'])]
    public function edit(Request $request, LeaveRequest $leaveRequest, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('leave_request_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }

        $form = $this->createForm(LeaveRequestType::class, $leaveRequest);
        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse(JsonResponse::HTTP_OK);
        }

        return new JsonResponse(JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}/delete', name: 'app_leave_request_delete', methods: ['DELETE'])]
    public function delete(Request $request, LeaveRequest $leaveRequest, EntityManagerInterface $entityManager): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete'.$leaveRequest->getId())->getValue();
    
        if (!$this->isCsrfTokenValid('delete'.$leaveRequest->getId(), $csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }
    
        $entityManager->remove($leaveRequest);
        $entityManager->flush();
    
        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }
}
