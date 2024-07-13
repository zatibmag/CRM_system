<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240713123612 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Delete relation';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE8C03F15C');
        $this->addSql('DROP INDEX IDX_2FB3D0EE8C03F15C ON project');
        $this->addSql('ALTER TABLE project DROP employee_id');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE project ADD employee_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE8C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_2FB3D0EE8C03F15C ON project (employee_id)');
    }
}
