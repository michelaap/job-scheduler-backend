import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterFieldProvider1595100265049
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedulings', 'provider');

    await queryRunner.addColumn(
      'schedulings',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'schedulings',
      new TableForeignKey({
        name: 'schedulingProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schedulings', 'schedulingProvider');

    await queryRunner.dropColumn('schedulings', 'provider_id');

    await queryRunner.addColumn(
      'schedulings',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
