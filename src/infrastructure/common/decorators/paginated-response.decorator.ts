import {applyDecorators} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {PaginationMeta} from "../../../domain/common/pagination-meta";

export const ApiPaginatedResponse = <TModel extends Function>(model: TModel) => {
    return applyDecorators(
        ApiExtraModels(PaginationMeta),
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: {$ref: getSchemaPath(model)},
                            },
                            meta: {$ref: getSchemaPath(PaginationMeta)},
                        },
                    },
                ],
            },
        }),
    );
};
