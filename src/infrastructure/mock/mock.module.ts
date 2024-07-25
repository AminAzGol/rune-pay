import {Module} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {RepositoriesModule} from "../repositories/repository.module";
import {ShopMock} from "./shop.mock";

@Module({
    imports: [RepositoriesModule],
    providers: [UserMock, ShopMock],
    exports: [UserMock, ShopMock]
})

export class MockModule {
}