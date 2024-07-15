<?php

namespace App\Controller;

use App\Entity\ApprovalRequest;
use App\Form\ApprovalRequestType;
use App\Repository\ApprovalRequestRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;

#[Route('/approval-request')]
class ApprovalRequestController extends AbstractController
{
    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }


    #[Route('/', name: 'app_approval_request_index', methods: ['GET'])]
    public function index(ApprovalRequestRepository $approvalRequestRepository): JsonResponse
    {
        $approvalRequests = $approvalRequestRepository->findAll();

        $approvalRequestsArray = [];
        foreach ($approvalRequests as $approvalRequest) {
            $approvalRequestsArray[] = [
                'id' => $approvalRequest->getId(),
                'approver' => $approvalRequest->getApprover(),
                'leaveRequest' => $approvalRequest->getLeaveRequest(),
                'status' => $approvalRequest->getStatus(),
                'comment' => $approvalRequest->getComment(),
            ];
        }

        return new JsonResponse($approvalRequestsArray);
    }

    #[Route('/new', name: 'app_approval_request_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('approval_request_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $approvalRequest = new ApprovalRequest();
        $form = $this->createForm(ApprovalRequestType::class, $approvalRequest);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($approvalRequest);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Approval request created'], JsonResponse::HTTP_CREATED);
        }

        return new JsonResponse(['message' => 'Invalid form data'], JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/csrf-token-form-approval-request', name: 'app_csrf_token_form_approval_request', methods: ['GET'])]
    public function getCsrfTokenForm(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('approval_request_form')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/csrf-token-delete-approval-request', name: 'app_csrf_token_delete_approval_request', methods: ['GET'])]
    public function getCsrfTokenDelete(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete_approval_request')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/{id}', name: 'app_approval_request_show', methods: ['GET'])]
    public function show(ApprovalRequest $approvalRequest): Response
    {
        return $this->render('approval_request/show.html.twig', [
            'approval_request' => $approvalRequest,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_approval_request_edit', methods: ['PUT'])]
    public function edit(Request $request, ApprovalRequest $approvalRequest, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('approval_request_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $form = $this->createForm(ApprovalRequestType::class, $approvalRequest);
        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse(['message' => 'Approval request updated'], JsonResponse::HTTP_OK);
        }

        return new JsonResponse(['message' => 'Invalid form data'], JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}/delete', name: 'app_approval_request_delete', methods: ['DELETE'])]
    public function delete(Request $request, ApprovalRequest $approvalRequest, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('delete_approval_request', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(['message' => 'Invalid CSRF token'], JsonResponse::HTTP_FORBIDDEN);
        }

        $entityManager->remove($approvalRequest);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Approval request deleted'], JsonResponse::HTTP_NO_CONTENT);
    }
}
