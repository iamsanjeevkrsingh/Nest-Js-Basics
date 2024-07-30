import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1722334595961 implements MigrationInterface {
  name = 'Products1722334595961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."products_category_enum" AS ENUM('men', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "category" "public"."products_category_enum" NOT NULL DEFAULT 'men'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
    await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
  }
}
