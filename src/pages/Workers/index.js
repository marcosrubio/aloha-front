import React, { useContext } from "react";
import CRUDContext from "../../components/CRUDContext";
import WorkerList from "./WorkerList";
import Layout from "../Layout";
import "./Workers.scss";

function Workers({ filters }) {
  const { workersCRUD } = useContext(CRUDContext);
  const workers = workersCRUD.store;

  const content = workers ? (
    <WorkerList workers={workers} />
  ) : (
    <h2>Loading...</h2>
  );

  const sidebar = <div>SIDEBAR</div>;

  return (
    <div className="workers">
      <Layout sidebar={sidebar} content={content} filters={filters} />
    </div>
  );
}

export default Workers;
