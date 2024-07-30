import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1722332765175 implements MigrationInterface {
  name = 'Products1722332765175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "imageUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
  }
}
