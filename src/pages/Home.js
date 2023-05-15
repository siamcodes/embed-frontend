import { Posts } from '../components/post/Posts';
import { Slides } from '../layout/Slides';
import Jumbotron from "../layout/Jumbotron";

export const Home = () => {
    return (
        <>
            <Slides />
            <div className="jumbotron text-danger h1 fw-bold text-center">
                <Jumbotron text={[
                    "สาขาเทคโนโลยีระบบสมองกลฝังตัว",
                    "โรงเรีนจิตรลดาวิชาชีพ",
                    "เปิดสอนในระดับประกาศนียบัตรวิชาชีพ",
                    "ในรูปแบบ Project base learning"
                ]} />
            </div>

            <Posts />
        </>
    )
}