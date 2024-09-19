import { createUser } from "@/app/lib/userRecordController";

const Page = async () => {
    return(
        <div>
            <form action={createUser}>
                <input type="text" name="username" />
                <br />
                <input type="text" name="password" />
                <br />
                <button type="submit">作成</button>
            </form>
        </div>
    );

}

export default Page;