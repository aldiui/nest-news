import {  ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodEffects, ZodObject } from "zod";

type ZodSchemaType = ZodObject<any> | ZodEffects<ZodObject<any>>;

interface ZodSchemaClass {
    schema: ZodSchemaType;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (this.isZodSchema(metadata.metatype)) {
            const schema = metadata.metatype.schema;
            const result = schema.safeParse(value);

            if (!result.success) {
                throw new BadRequestException({
                    statusCode: 422,
                    message: 'Validation failed',
                    errors: result.error.errors.map((error) => ({
                        path: error.path.join('.'),
                        message: error.message
                    }))
                })
            }
            return result.data;
        }
        return value;
    }

    private isZodSchema(metatype: any): metatype is ZodSchemaClass {
        if(typeof metatype !== 'function') return false;
        const schema = (metatype as unknown as ZodSchemaClass).schema;
        return schema !== undefined && typeof schema.safeParse === 'function';
    }
}