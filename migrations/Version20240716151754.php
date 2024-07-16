<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240716151754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Craete db from scratch';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE approval_request (id INT AUTO_INCREMENT NOT NULL, approver VARCHAR(255) DEFAULT NULL, leave_request VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE employee (id INT AUTO_INCREMENT NOT NULL, full_name VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, subdivision VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, people_partner VARCHAR(255) NOT NULL, out_of_office_balance VARCHAR(255) NOT NULL, photo VARCHAR(255) DEFAULT NULL, projects LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_IDENTIFIER_FULL_NAME (full_name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE leave_request (id INT AUTO_INCREMENT NOT NULL, employee VARCHAR(255) DEFAULT NULL, absence_reason VARCHAR(255) DEFAULT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, comment VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, reviewer_comment VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, project_type VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, project_name VARCHAR(255) NOT NULL, project_manager VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE approval_request');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE leave_request');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
