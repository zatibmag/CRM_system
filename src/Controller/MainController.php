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
        $employee1 = new Employee();
        $employee1->setFullName('Project Manager');
        $employee1->setRoles(['ROLE_PROJECT_MANAGER']);
        $employee1->setPassword('password');
        $employee1->setSubdivision('Subdivision');
        $employee1->setPosition('PROJECT_MANAGER');
        $employee1->setStatus('Active');
        $employee1->setPeoplePartner('People Partner');
        $employee1->setOutOfOfficeBalance(10);
        $employee1->setPhoto(null);
    
        $this->entityManager->persist($employee1);
    
        $employee2 = new Employee();
        $employee2->setFullName('HR Manager');
        $employee2->setRoles(['ROLE_HR_MANAGER']);
        $employee2->setPassword('password');
        $employee2->setSubdivision('Subdivision');
        $employee2->setPosition('HR_MANAGER');
        $employee2->setStatus('Active');
        $employee2->setPeoplePartner('People Partner');
        $employee2->setOutOfOfficeBalance(10);
        $employee2->setPhoto(null);
    
        $this->entityManager->persist($employee2);
    
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Employee created successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/showEmployee', name: 'show_employee')]
    public function findAllEmployees(): JsonResponse
    {
        $employeeRepository = $this->entityManager->getRepository(Employee::class);
        $employees = $employeeRepository->findAll();

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

        return new JsonResponse($data);
    }
}
