<?php

namespace App\Controller;

use App\Entity\Employee;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private EmployeeRepository $employeeRepository;

    public function __construct(EntityManagerInterface $entityManager, EmployeeRepository $employeeRepository)
    {
        $this->entityManager = $entityManager;
        $this->employeeRepository = $employeeRepository;
    }

    #[Route('/', name: 'app_main')]
    public function index(): Response
    {
        return $this->render('main/index.html.twig');
    }

    #[Route('/newEmployee', name: 'new_employee', methods: ['GET'])]
    public function newEmployee(): JsonResponse
    {
        // Create a new Employee entity
        $employee = new Employee();
        $employee->setFullName('Aboba Abobowitch');
        $employee->setRoles(['ROLE_PROJECT_MANAGER']);
        $employee->setPassword('password'); // You should hash the password in a real application
        $employee->setSubdivision('Subdivision');
        $employee->setPosition('Position');
        $employee->setStatus('Active');
        $employee->setPeoplePartner('People Partner');
        $employee->setOutOfOfficeBalance('10 days');
        $employee->setPhoto(null);

        // Persist the employee to the database
        $this->entityManager->persist($employee);
        $this->entityManager->flush();

        // Return the newly created employee as a JSON response
        return new JsonResponse(['message' => 'Employee created successfully'], JsonResponse::HTTP_CREATED);
    }


    #[Route('/showEmployee', name: 'show_employee')]
    public function findAllEmployees(): JsonResponse
    {
        // Fetch all employees from the database
        $employeeRepository = $this->entityManager->getRepository(Employee::class);
        $employees = $employeeRepository->findAll();

        // Prepare data array for JSON response
        $data = [];
        foreach ($employees as $employee) {
            $data[] = [
                'id' => $employee->getId(),
                'fullName' => $employee->getFullName(),
                'roles' => $employee->getRoles(),
                'subdivision' => $employee->getSubdivision(),
                'position' => $employee->getPosition(),
                'status' => $employee->getStatus(),
                'peoplePartner' => $employee->getPeoplePartner(),
                'outOfOfficeBalance' => $employee->getOutOfOfficeBalance(),
                'photo' => $employee->getPhoto(),
            ];
        }

        // Return employees as a JSON response
        return new JsonResponse($data);
    }
}
