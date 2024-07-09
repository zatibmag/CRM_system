<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240708161637 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add name to Project';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project ADD project_name VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project DROP project_name');
    }
}
