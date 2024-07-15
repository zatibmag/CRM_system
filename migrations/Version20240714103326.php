<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240714103326 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add reviewer column to LeaveRequest';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('DROP TABLE render_leave');
        $this->addSql('ALTER TABLE leave_request ADD reviewer_comment VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('CREATE TABLE render_leave (id INT AUTO_INCREMENT NOT NULL, reviewer_comment VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE leave_request DROP reviewer_comment');
    }
}
