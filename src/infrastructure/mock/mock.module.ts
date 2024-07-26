import {Module} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {RepositoriesModule} from "../repositories/repository.module";
import {ShopMock} from "./shop.mock";
import {ShopUserMock} from "./shop-user.mock";

@Module({
    imports: [RepositoriesModule],
    providers: [UserMock, ShopMock, ShopUserMock],
    exports: [UserMock, ShopMock, ShopUserMock]
})

export class MockModule {
}