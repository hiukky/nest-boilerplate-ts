import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsers1587518358055 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'email',
        type: 'string',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table)
  }
}
