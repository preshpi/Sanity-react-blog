import { React, useState, useEffect } from "react";
import client from "../client";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { format } from "date-fns";

function Allblog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
        title,
        slug,
        body,
        description,
        tags,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        },
        "name": author -> name,
      } | order(publishedAt desc)`
      )
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch(console.error);
    setIsLoading(false);
  }, []);
  return (
    <>
      <section className="px-5 2xl:mx-auto 2xl:max-w-7xl mt-[50px] mb-[30px]">
        <h1 className="text-center text-3xl text-black font-bold mb-10">
          All Blog Posts
        </h1>
        {isLoading ? (
          <div className="spinner w-[50%] mx-auto mt-5"></div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-5 mb-20 ">
            {posts.map((posts) => (
              <article
                key={posts.slug.current}
                className="hover:opacity-75 hover:transition-all duration-300 w-full mx-auto"
              >
                <div>
                  <Link to={`/blog/${posts.slug.current}`}>
                    <LazyLoadImage
                      src={posts.mainImage.asset.url}
                      lazy="loading"
                      effect="blur"
                      alt={posts.title}
                      className="bg-gray-100 lg:w-[500px] lg:h-[300px] object-cover rounded-md"
                    />
                  </Link>
                </div>
                <p className="mt-3">
                  {format(new Date(posts.publishedAt), "dd MMMM yyyy")}
                </p>
                <h4 className="mt-6 header font-semibold text-xl lg:w-full ">
                  {posts.title}
                </h4>
                <Link
                  to={`/blog/${posts.slug.current}`}
                  className="flex items-end justify-end "
                >
                  <button className="font-bold text-2xl">
                    <FiArrowUpRight />
                  </button>
                </Link>
                <p className="text-sm leading-relaxed w-full text-justify mt-3">
                  {posts.description}
                </p>
                <div className="flex gap-6 flex-wrap mt-3">
                  <div className="flex gap-6 flex-wrap mt-3">
                    {posts.tags.map((item, id) => (
                      <div key={id}>
                        <label className="rounded-lg bg-slate-300 text-black-800 text-sm p-2 font-[500]">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="max-w-7xl justify-center flex items-center mt-7">
          <button className="py-2 px-8 bg-black text-white rounded shadow hover:bg-transparent hover:border-2 hover:border-black hover:text-black transition-all duration-300 tracking-wide">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Allblog;
