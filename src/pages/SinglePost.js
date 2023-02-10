import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../client"
import BlockContent from "@sanity/block-content-to-react";

function SinglePost() {
  const [singlePost, setSinglePost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
        title,
        body,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      }`
      )
      .then((data) => setSinglePost(data[0]));
    setIsLoading(false);
  }, [slug]);
  return (
    <>
      <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
        <button className="mt-[30px] bg-black text-white hover:opacity-75 transistion-all duration-500 px-2 py-2 lg:text-x text-sm rounded-md">
          <Link to="/">Go back</Link>
        </button>
        {isLoading ? (
          <div class="spinner w-[50%] mx-auto mt-5"></div>
        ) : (
          <div className="items-center justify-center flex lg:mt-[4%] mt-[10%]">
            <h1 className="uppercase font-semibold lg:text-4xl text-2xl text-center w-[600px] header">
              {singlePost.title}
            </h1>
          </div>
        )}
        {singlePost.mainImage && singlePost.mainImage.asset && (
          <div className="items-center justify-center flex lg:pt-[3%] pt-[5%]">
            <div className="w-[800px] h-[350px]">
              <img
                src={singlePost.mainImage.asset.url}
                alt={singlePost.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        )}

        <div className="w-[300px] lg:w-full lg:text-justify leading-loose mt-[7%]">
          <BlockContent
            blocks={singlePost.body}
            projectId="2hp9gld0"
            dataset="production"
          />
        </div>
      </section>
    </>
  );
}

export default SinglePost;
