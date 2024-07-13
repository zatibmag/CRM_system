<?php

namespace App\Controller;

use App\Entity\Employee;
use App\Form\EmployeeType;
use App\Repository\EmployeeRepository;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;


#[Route('/employees')]
class EmployeeController extends AbstractController
{
    private $csrfTokenManager;
    private $projectRepository;
    private $entityManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager,
     ProjectRepository $projectRepository,
     EntityManagerInterface $entityManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
        $this->projectRepository = $projectRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'app_employee_index', methods: ['GET'])]
    public function index(EmployeeRepository $employeeRepository): JsonResponse
    {
        $employees = $employeeRepository->findAll();

        $employeesArray = [];
        foreach ($employees as $employee) {
            $employeesArray[] = [
                'id' => $employee->getId(),
                'fullName' => $employee->getFullName(),
                'roles' => $employee->getRoles(),
                'subdivision' => $employee->getSubdivision(),
                'position' => $employee->getPosition(),
                'status' => $employee->getStatus(),
                'peoplePartner' => $employee->getPeoplePartner(),
                'outOfOfficeBalance' => $employee->getOutOfOfficeBalance(),
                'projects' => $employee->getProjects(),
                'photo' => $employee->getPhoto()
            ];
        }

        return new JsonResponse($employeesArray);
    }

    #[Route('/roles', name: 'roles', methods: ['GET'])]
    public function roles(): JsonResponse
    {
        return new JsonResponse(Employee::ROLES);
    }

    #[Route('/subdivisions', name: 'subdivision', methods: ['GET'])]
    public function subdivision(): JsonResponse
    {
        return new JsonResponse(Employee::SUBDIVISIONS);
    }

    #[Route('/positions', name: 'positions', methods: ['POST'])]
    public function positions(): JsonResponse
    {
        return new JsonResponse(Employee::POSITIONS);
    }

    #[Route('/new', name: 'app_employee_new', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $csrfToken = new CsrfToken('employee_form', $data['_csrf_token'] ?? '');

        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(['error' => 'Invalid CSRF token.'], JsonResponse::HTTP_FORBIDDEN);
        }

        $employee = new Employee();
        $employee->setFullName($data['fullName']);
        $employee->setPassword($data['password']);
        $employee->setStatus($data['status']);
        $employee->setPeoplePartner($data['peoplePartner']);
        $employee->setPosition($data['position']);
        $employee->setRoles($data['roles']);
        $employee->setSubdivision($data['subdivision']);
        $employee->setOutOfOfficeBalance($data['outOfOfficeBalance']);
        $employee->setProjects($data['project']);
        $file = $request->files->get('photo');
        if ($file) {
            $newFilename = uniqid().'.'.$file->guessExtension();
            try {
                $file->move(
                    $this->getParameter('photos_directory'),
                    $newFilename
                );
            } catch (FileException $e) {
                return new JsonResponse(['error' => 'Failed to upload photo.'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
            $employee->setPhoto($newFilename);
        }

        $this->entityManager->persist($employee);
        $this->entityManager->flush();

        return new JsonResponse(['success' => 'Employee created.'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/csrf-token-form-employee', name: 'app_csrf_token_form_employee', methods: ['GET'])]
    public function getCsrfTokenFormEmployee(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('employee_form')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }    

    #[Route('/csrf-token-delete', name: 'app_csrf_token_delete', methods: ['GET'])]
    public function getCsrfTokenDelete(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete_employee')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }

    #[Route('/{id}', name: 'app_employee_show', methods: ['GET'])]
    public function show(Employee $employee): Response
    {
        return $this->render('employee/show.html.twig', [
            'employee' => $employee,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_employee_edit', methods: ['PUT'])]
    public function edit(Request $request, Employee $employee, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $csrfToken = new CsrfToken('employee_form', $data['_csrf_token'] ?? '');
        if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }

        $form = $this->createForm(EmployeeType::class, $employee);
        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return new JsonResponse(JsonResponse::HTTP_OK);
        }

        return new JsonResponse(JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}/delete', name: 'app_employee_delete', methods: ['DELETE'])]
    public function delete(Request $request, Employee $employee, EntityManagerInterface $entityManager): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('delete'.$employee->getId())->getValue();
    
        if (!$this->isCsrfTokenValid('delete'.$employee->getId(), $csrfToken)) {
            return new JsonResponse(JsonResponse::HTTP_FORBIDDEN);
        }
    
        $entityManager->remove($employee);
        $entityManager->flush();
    
        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }
}
