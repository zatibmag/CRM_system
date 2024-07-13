<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_FULL_NAME', fields: ['fullName'])]
class Employee implements UserInterface, PasswordAuthenticatedUserInterface
{
    public const ROLES = [
        "ROLE_EMPLOYEE",
        "ROLE_HR_MANAGER",
        "ROLE_PROJECT_MANAGER",
        "ROLE_ADMINISTRATOR",
    ];

    public const POSITIONS = [
        "HR_MANAGER",
        "PROJECT_MANAGER",
        "ADMINISTRATOR",
        "PROGRAMMER"
    ];

    public const SUBDIVISIONS = [
        "Human Resources (HR)",
        "Finance",
        "Marketing",
        "Sales",
        "Research and Development (R&D)",
        "Information Technology (IT)"
    ];


    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $fullName = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $subdivision = null;

    #[ORM\Column(length: 255)]
    private ?string $position = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(length: 255)]
    private ?string $peoplePartner = null;

    #[ORM\Column(length: 255)]
    private ?string $outOfOfficeBalance = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photo = null;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'projectManager')]
    private Collection $projects;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'employee')]
    private Collection $currentProjects;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->currentProjects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->fullName;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getSubdivision(): ?string
    {
        return $this->subdivision;
    }

    public function setSubdivision(string $subdivision): static
    {
        $this->subdivision = $subdivision;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): static
    {
        $this->position = $position;

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

    public function getPeoplePartner(): ?string
    {
        return $this->peoplePartner;
    }

    public function setPeoplePartner(string $peoplePartner): static
    {
        $this->peoplePartner = $peoplePartner;

        return $this;
    }

    public function getOutOfOfficeBalance(): ?string
    {
        return $this->outOfOfficeBalance;
    }

    public function setOutOfOfficeBalance(string $outOfOfficeBalance): static
    {
        $this->outOfOfficeBalance = $outOfOfficeBalance;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): static
    {
        $this->photo = $photo;

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setProjectManager($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            if ($project->getProjectManager() === $this) {
                $project->setProjectManager(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getCurrentProjects(): Collection
    {
        return $this->currentProjects;
    }

    public function addCurrentProject(Project $currentProject): static
    {
        if (!$this->currentProjects->contains($currentProject)) {
            $this->currentProjects->add($currentProject);
            $currentProject->setEmployee($this);
        }

        return $this;
    }

    public function removeCurrentProject(Project $currentProject): static
    {
        if ($this->currentProjects->removeElement($currentProject)) {
            if ($currentProject->getEmployee() === $this) {
                $currentProject->setEmployee(null);
            }
        }

        return $this;
    }
}
