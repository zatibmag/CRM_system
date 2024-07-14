<?php

namespace App\Controller;

use App\Entity\LeaveRequest;
use App\Form\LeaveRequestType;
use App\Repository\LeaveRequestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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

    #[Route('/', name: 'app_leave_request_index', methods: ['GET'])]
    public function index(LeaveRequestRepository $leaveRequestRepository): JsonResponse
    {
        $leaveRequests = $leaveRequestRepository->findAll();

        $leaveRequestsArray = [];
        foreach ($leaveRequests as $leaveRequest) {
            $leaveRequestsArray[] = [
                'id' => $leaveRequest->getId(),
                'name' => $leaveRequest->getName(),
                'employee' => $leaveRequest->getEmployee(),
                'absenceReason' => $leaveRequest->getAbsenceReason(),
                'startDate' => $leaveRequest->getStartDate()->format('Y-m-d'),
                'endDate' => $leaveRequest->getEndDate()->format('Y-m-d'),
                'status' => $leaveRequest->getStatus(),
                'comment' => $leaveRequest->getComment()
            ];
        }

        return new JsonResponse($leaveRequestsArray);
    }

    #[Route('/absence-reason', name: 'absenceReason', methods: ['POST'])]
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
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $leaveRequest = new LeaveRequest();
        $form = $this->createForm(LeaveRequestType::class, $leaveRequest);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($leaveRequest);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Leave request created'], JsonResponse::HTTP_CREATED);
        }

        return new JsonResponse(['message' => 'Invalid form data'], JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/csrf-token-form-leave-request', name: 'app_csrf_token_form_leave_request', methods: ['GET'])]
    public function getCsrfTokenForm(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('leave_request_form')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/csrf-token-delete-leave-request', name: 'app_csrf_token_delete_leave_request', methods: ['GET'])]
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
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $form = $this->createForm(LeaveRequestType::class, $leaveRequest);
        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse(['message' => 'Leave request updated'], JsonResponse::HTTP_OK);
        }

        return new JsonResponse(['message' => 'Invalid form data'], JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}/delete', name: 'app_leave_request_delete', methods: ['DELETE'])]
    public function delete(Request $request, LeaveRequest $leaveRequest, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('delete_leave_request', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $entityManager->remove($leaveRequest);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Leave request deleted'], JsonResponse::HTTP_NO_CONTENT);
    }
}
