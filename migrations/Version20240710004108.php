<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240710004108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Return startDate to normal type';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project CHANGE start_date start_date DATE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project CHANGE start_date start_date DATETIME NOT NULL');
    }
}
