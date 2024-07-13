<?php

namespace App\Form;

use App\Entity\Employee;
use App\Repository\ProjectRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class EmployeeType extends AbstractType
{
    private $csrfTokenManager;
    private $projectRepository;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager, ProjectRepository $projectRepository)
    {
        $this->csrfTokenManager = $csrfTokenManager;
        $this->projectRepository = $projectRepository;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $projects = $this->projectRepository->findAll();
        $projectChoices = [];
        foreach ($projects as $project) {
            $projectChoices[$project->getProjectName()] = $project->getId();
        }

        $builder
            ->add('fullName', TextType::class)
            ->add('roles', CollectionType::class, [
                'entry_type' => TextType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
            ->add('password', TextType::class)
            ->add('subdivision', TextType::class)
            ->add('position', TextType::class)
            ->add('status', TextType::class)
            ->add('peoplePartner', TextType::class)
            ->add('outOfOfficeBalance', TextType::class)
            ->add('photo', FileType::class, [
                'label' => 'Photo (Image file)',
                'mapped' => false,
                'required' => false,
            ])
            ->add('projects', CollectionType::class, [
                'entry_type' => TextType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
            ->add('_csrf_token', HiddenType::class, [
                'mapped' => false,
                'data' => $this->csrfTokenManager->getToken('employee_form')->getValue()
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Employee::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_csrf_token',
            'csrf_token_id' => 'employee_form',
        ]);
    }
}
