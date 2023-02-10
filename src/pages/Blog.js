import { React, useState, useEffect } from "react";
import client from "../client";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import ComMain from "../components/ComMain";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function Blog() {
  const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
        title,
        slug,
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
      .then((data) => setPosts(data))
      .catch(console.error)
          setIsLoading(false);

  }, [])
  return (
    <>
      <ComMain />
      <section className="px-5 2xl:mx-auto 2xl:max-w-7xl mt-[50px] mb-[30px]">
        {isLoading ? (
          <div class="spinner w-[50%] mx-auto mt-5"></div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {posts.map((posts) => (
              <article
                key={posts.slug.current}
                className="lg:w-[500px] w-[300px] md:w-[500px]"
              >
                <div className="">
                  <Link to={`/blog/${posts.slug.current}`}>
                    <LazyLoadImage
                      src={posts.mainImage.asset.url}
                      lazy="loading"
                      effect="blur"
                      alt={posts.title}
                      className="lg:w-[500px] lg:h-[300px] object-cover rounded-md"
                    />
                  </Link>
                </div>
                <h4 className="mt-6 header font-semibold text-2xl lg:w-full ">
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
                <p className="text-sm leading-relaxed w-[300px] lg:w-full lg:text-justify">
                  Man request adapted spirits set pressed. Up to denoting
                  subjects sensible feelings it indulged directly. We dwelling
                  elegance do shutters appetite yourself diverted. Our next drew
                  much you with rank.
                </p>
                <div className="flex gap-6 flex-wrap mt-3">
                  <label className="rounded-lg bg-blue-50 text-blue-800 text-sm p-2 font-[500]">
                    Design
                  </label>
                  <label className="rounded-lg bg-pink-50 text-pink-800 text-sm p-2 font-[500]">
                    Life
                  </label>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Blog;
