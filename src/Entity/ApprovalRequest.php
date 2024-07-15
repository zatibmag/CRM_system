<?php

namespace App\Entity;

use App\Repository\ApprovalRequestRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ApprovalRequestRepository::class)]
class ApprovalRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $approver = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $leaveRequest = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $comment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApprover(): ?string
    {
        return $this->approver;
    }

    public function setApprover(?string $approver): static
    {
        $this->approver = $approver;

        return $this;
    }

    public function getLeaveRequest(): ?string
    {
        return $this->leaveRequest;
    }

    public function setLeaveRequest(?string $leaveRequest): static
    {
        $this->leaveRequest = $leaveRequest;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }
}
