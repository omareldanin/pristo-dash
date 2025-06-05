import { AppLayout } from "../../components/AppLayout";
import classes from "./home.module.scss";
import heading1 from "../../assets/Heading.png";
import heading2 from "../../assets/Logo.png";
// import users from "../../assets/3 User.png";
// import users2 from "../../assets/Mask group.png";
// import icon1 from "../../assets/1.png";
// import icon2 from "../../assets/􀍾 (1).png";
// import icon3 from "../../assets/􀍾 (2).png";
// import { ChartCard } from "../../components/Chart";

export const HomeScreen = () => {
  const date = new Date();
  return (
    <AppLayout>
      <div className={classes.home}>
        <div className={classes.date}>
          <h1>اليوم</h1>
          <p>{date.toLocaleString()}</p>
        </div>
        <div className={classes.welcomeImage}>
          <img src={heading1} alt="" />
          <img src={heading2} alt="" />
        </div>
        {/* <div
          className={
            classes.numbers +
            " grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
          }>
          <div className={classes.users}>
            <div className={classes.image + " center"}>
              <img src={users} />
            </div>
            <h2>عدد المقترعين في لوائح الشطب</h2>
            <h2>8700</h2>
          </div>
          <div className={classes.voters}>
            <div className={classes.image + " center"}>
              <img src={users2} />
            </div>
            <h2>عدد المقترعين الحالي</h2>
            <h2>2500</h2>
          </div>
          <div className={classes.chart + " col-span-2"}>
            <ChartCard />
          </div>
        </div>
        <div
          className={
            classes.statistics +
            " grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }>
          <div className={classes.against}>
            <div className={classes.head}>
              <h2>ضد اللائحه</h2>
              <h2>5%</h2>
            </div>
            <div className={classes.c100}>
              <div className={classes.icon}></div>
              <div className={classes.border}></div>
            </div>
            <div className={classes.image}>
              <img src={icon1} />
            </div>
          </div>
          <div className={classes.grey}>
            <div className={classes.head}>
              <h2>رمادى</h2>
              <h2>5%</h2>
            </div>
            <div className={classes.c100}>
              <div className={classes.icon}></div>
              <div className={classes.border}></div>
            </div>
            <div className={classes.image}>
              <img src={icon2} />
            </div>
          </div>
          <div className={classes.with}>
            <div className={classes.head}>
              <h2>مع اللائحه</h2>
              <h2>5%</h2>
            </div>
            <div className={classes.c100}>
              <div className={classes.icon}></div>
              <div className={classes.border}></div>
            </div>
            <div className={classes.image}>
              <img src={icon3} />
            </div>
          </div>
        </div> */}
      </div>
    </AppLayout>
  );
};
