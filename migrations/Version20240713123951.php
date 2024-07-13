<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240713123951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add projects';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE employee ADD projects LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE employee DROP projects');
    }
}
