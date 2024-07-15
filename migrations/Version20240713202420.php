<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240713202420 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add Project manager to project';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project ADD project_manager VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project DROP project_manager');
    }
}
