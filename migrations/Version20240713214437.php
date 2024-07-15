<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240713214437 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create leaveRequest';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE leave_request (id INT AUTO_INCREMENT NOT NULL, employee VARCHAR(255) DEFAULT NULL, absence_reason VARCHAR(255) DEFAULT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, comment VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE leave_request');
    }
}
