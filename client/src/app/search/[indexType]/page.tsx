"use client";
import Search from "../../../components/search/Search";

const Page = ({ params: { indexType } }: { params: { indexType: string } }) => {
  return <Search indexType={indexType} />;
};

export default Page;
