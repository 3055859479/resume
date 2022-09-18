import { Button, ConfigProvider } from "antd";
import { useCallback, useState } from "react";
import BasicDrawer from "./components/BasicDrawer";
import Resume from "./components/Resume/index";
import TechDrawer from "./components/TechDrawer";
import {
  DrawerVisibleType,
  FormStaticType,
  JobDataItemType,
  JobDataType,
  TechDataType,
} from "./types/static";
import downloadPDF from "./util/html2pdf";
import "./App.css";
import JobDrawer from "./JobDrawer";
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { simpleDate } from "./util/date";
export default function App() {
  const [formBasic, setFormBasic] = useState<FormStaticType>({
    name: "一泽今天写bug了吗",
    mobile: "123456789",
    email: "3055859479@qq.com",
    frontEndTime: "2年",
    school: "中南大学",
    major: "计算机科学与技术（非相关专业可不填）",
    age: 25,
    salary: "25k（不填为面议）",
    blog: "https://juejin.cn/user/2419405862219277",
    github: "https://github.com/3055859479",
    reward:"1. 大学英语四级/六级证书\n2. 高级软件设计师（软考证书）\n3. PAT证书",
    evaluation:"1. 注重代码质量，有代码洁癖\n2. 在保证一定工作效率的前提下不介意加班\n3. 良好的语言沟通能力，能够积极主动交流以便快速解决问题\n4. 对前端领域的知识有持续学习的动力，注重自身技术的提升\n"
  });

  const [techData, setTechData] = useState<TechDataType>({
    tools: [
      {
        name: "Gulp",
        select: true,
      },
      {
        name: "Grunt",
        select: true,
      },
      {
        name: "Webpack",
        select: true,
      },
      {
        name: "Parcel",
        select: true,
      },
      {
        name: "Vite",
        select: true,
      },
    ],
    webgl: [
      {
        name: "threejs",
        select: true,
      },
      {
        name: "canvas",
        select: true,
      },
    ],
    frame: [
      {
        name: "vue",
        select: true,
      },
      {
        name: "react",
        select: true,
      },
      {
        name: "UI设计",
        select: true,
      },
    ],
    list: [
      {
        name: "小程序",
        select: true,
      },
      {
        name: "移动端开发",
        select: true,
      },
      {
        name: "Typescript",
        select: true,
      },
      {
        name: "SSR",
        select: true,
      },
      {
        name: "NodeJS",
        select: true,
      },
      {
        name: "PHP",
        select: true,
      },
      {
        name: "JAVA",
        select: true,
      },
      {
        name: "Python",
        select: true,
      },
      {
        name: "GO",
        select: true,
      },
      {
        name: "MYSQL",
        select: true,
      },
      {
        name: "MongoDB",
        select: true,
      },
      {
        name: "Redis",
        select: true,
      },
    ],
  });
  const [jobData,setJobData]=useState<JobDataType>([{companyName:'XXX网络科技有限公司',startTime:'2020-7',dueTime:'2022-5',dimission:true,department:'平台研发部-大前端部',position:'Web前端开发工程师',jobDescription:' 我在此项目负责了哪些工作，这个项目中，有什么给我最深刻的印象，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中，我最自豪的技术细节是什么，为什么，实施前和实施后的数据对比如何，同事和领导对此的反应如何。'}])
  const [drawerVisible, setDrawerVisible] = useState<DrawerVisibleType>({
    basicDrawerVisible: false,
    techDrawerVisible: false,
    jobDrawerVisible: false
  });

  const handleOpenDrawer = useCallback(
    (name:keyof DrawerVisibleType) => {
      setDrawerVisible((pre) => ({ ...pre, [name]: true }));
    },
    []
  );
  const handleCloseDrawer = useCallback(
    (name:keyof DrawerVisibleType) => {
      setDrawerVisible((pre) => ({ ...pre, [name]: false }));
    },
    []
  );
  const onBasicChange=useCallback((changedFields:FormStaticType)=>{
    setFormBasic(pre=>({...pre,...changedFields}))
  },[])
  const onChooseList = useCallback(
    (type: "tools" | "webgl" | "frame" | "list", targetIndex: number) => {
      const res = techData[type].map((v, i) =>
        i === targetIndex ? { ...v, select: !v.select } : v
      );
      setTechData((pre) => ({ ...pre, [type]: res }));
    },
    [techData]
  );
  const onJobChange=useCallback((_:JobDataItemType,allValues:{job:JobDataType})=>{
    console.log(allValues.job.map(v=>({period1:simpleDate(v.period[0]),period2:simpleDate(v.period[1])})))
  },[])
  // 下载PDF
  const exportPDF = useCallback(() => {
    const pdf = document.getElementById("resume-wrapper") as HTMLElement;
    downloadPDF(pdf, "Web前端开发", false, () => {});
  }, []);

//TODO: 这里在考虑用不用useLocalStorage做，如果用其实没必要留这个保存按钮了！
  const save = () => {};
 
  return (
    <ConfigProvider locale={locale}>
      <Resume
        handleOpenDrawer={handleOpenDrawer}
        formData={formBasic}
        jobData={jobData}
        techData={techData}
      />
      <BasicDrawer
        visible={drawerVisible.basicDrawerVisible}
        onChange={onBasicChange}
        initialValues={formBasic}
        handleCloseDrawer={handleCloseDrawer}
      />
      <TechDrawer
        visible={drawerVisible.techDrawerVisible}
        techData={techData}
        onChooseList={onChooseList}
        handleCloseDrawer={handleCloseDrawer}
      />
       <JobDrawer
        visible={drawerVisible.jobDrawerVisible}
        handleCloseDrawer={handleCloseDrawer}
        onChange={onJobChange}
        initialValues={[]}
      />
      <div className="operation-wrapper">
        <Button type="link" shape="default" className="save-btn" onClick={save}>
          保存简历
        </Button>
        <Button
          type="link"
          shape="default"
          className="download-btn"
          onClick={exportPDF}
        >
          生成简历
        </Button>
      </div>
    </ConfigProvider>
  );
}
