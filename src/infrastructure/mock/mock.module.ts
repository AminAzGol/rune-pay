import {Module} from "@nestjs/common";
import {UserMock} from "./user.mock";
import {RepositoriesModule} from "../repositories/repository.module";

@Module({
    imports: [RepositoriesModule],
    providers: [UserMock],
    exports: [UserMock]
})

export class MockModule {
}