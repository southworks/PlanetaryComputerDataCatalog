import React from "react";
import {
  Link,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";

import { useCollections } from "../utils/requests";

import SEO from "../components/Seo";
import Layout from "../components/Layout";
import CollectionCard from "../components/stac/CollectionCard";
import DatasetCard from "../components/DatasetCard";

import { sortSpecialByKey } from "../utils";
import {
  ai4e as datasetsConfig,
  collections as collectionsConfig,
} from "../config/datasets.yml";
import DefaultBanner from "../components/DefaultBanner";

import "./catalog.css";

const Catalog = () => {
  const banner = (
    <DefaultBanner>
      <h1>Data Catalog</h1>
      <p>
        The Planetary Computer Data Catalog includes petabytes of environmental
        monitoring data, in consistent, analysis-ready formats. All of the
        datasets below can be accessed via Azure Blob Storage, and can be used
        by developers whether you're working within or outside of our Planetary
        Computer Hub.
      </p>
    </DefaultBanner>
  );

  const { isLoading, isError, data: stacResponse } = useCollections();

  const errorMsg = (
    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
      Sorry, we're having trouble loading these datasets right now
    </MessageBar>
  );
  const loadingMsg = (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: 300,
        justifyContent: "center",
      }}
    >
      <Spinner size={SpinnerSize.large} />
    </div>
  );

  const primaryDatasets = isLoading
    ? loadingMsg
    : isError
    ? errorMsg
    : stacResponse.collections
        .sort(sortSpecialByKey("title"))
        .map(collection => {
          const name = collectionsConfig[collection.id]?.shortTerm;
          return (
            <CollectionCard
              key={`card-${collection.id}`}
              collection={collection}
              shortTerm={name}
            />
          );
        });

  const otherDatasets = datasetsConfig.map(dataset => {
    return <DatasetCard key={`card-${dataset.title}`} resourceItem={dataset} />;
  });

  return (
    <Layout bannerHeader={banner}>
      <SEO title="Data Catalog" />
      <section id="catalog-api-datasets">
        <div className="grid-content">
          <h2>Datasets available through the Planetary Computer API</h2>
          <p style={{ maxWidth: 800, marginBottom: 40 }}>
            Our largest data sets can be queried and accessed through our
            Planetary Computer API. We are continuing to expand the data
            available through the API, and continuing to bring new data sets to
            Azure. If you are interested in seeing additional data on-boarded or
            published through our API – or if you have data you'd like to
            contribute –{" "}
            <Link href="mailto:aiforearthdatasets@microsoft.com">
              contact us
            </Link>
            .
          </p>
          <div className="layout-container">
            <div className="layout-row">{primaryDatasets}</div>
          </div>
        </div>
      </section>

      <section id="catalog-additional-datasets">
        <div className="grid-content">
          <h2>Additional datasets</h2>
          <p style={{ maxWidth: 800, marginBottom: 40 }}>
            The following datasets are available on Azure, for use within or
            outside of the Planetary Computer Hub.
          </p>
          <div className="layout-container">
            <div className="layout-row">{otherDatasets}</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalog;
