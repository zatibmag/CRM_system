<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240714165937 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create ApprovalRequest';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE approval_request (id INT AUTO_INCREMENT NOT NULL, approver VARCHAR(255) DEFAULT NULL, leave_request VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE approval_request');
    }
}
