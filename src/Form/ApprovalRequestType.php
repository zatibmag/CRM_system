<?php

namespace App\Form;

use App\Entity\ApprovalRequest;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class ApprovalRequestType extends AbstractType
{
    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('approver', TextType::class, [
                'label' => 'Approver',
            ])  
            ->add('leaveRequest', TextType::class, [
                'label' => 'Leave Request',
            ])
            ->add('status', TextType::class, [
                'label' => 'Status',
            ])
            ->add('comment', TextareaType::class, [
                'label' => 'Comment',
            ])
            ->add('_csrf_token', HiddenType::class, [
                'mapped' => false,
                'data' => $this->csrfTokenManager->getToken('approval_request_form')->getValue()
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ApprovalRequest::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_csrf_token',
            'csrf_token_id' => 'approval_request_form',
        ]);
    }
}
