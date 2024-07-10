<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240710010509 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change status to string';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project CHANGE status status VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project CHANGE status status TINYINT(1) NOT NULL');
    }
}
