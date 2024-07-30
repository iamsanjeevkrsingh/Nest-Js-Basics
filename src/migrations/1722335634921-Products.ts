import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1722335634921 implements MigrationInterface {
  name = 'Products1722335634921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."products_category_enum" RENAME TO "products_category_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_category_enum" AS ENUM('men', 'female', 'other', 'someother')`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum" USING "category"::"text"::"public"."products_category_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'men'`,
    );
    await queryRunner.query(`DROP TYPE "public"."products_category_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."products_category_enum_old" AS ENUM('men', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" TYPE "public"."products_category_enum_old" USING "category"::"text"::"public"."products_category_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'men'`,
    );
    await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."products_category_enum_old" RENAME TO "products_category_enum"`,
    );
  }
}
