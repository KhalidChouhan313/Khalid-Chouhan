"use client";

import { Skeleton } from "@mui/material";

const BlogSkeleton = () => {
    return (
        <div className="w-full md:w-[70%] w-[90%] space-y-10">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="bg-[#1e242b] p-6 rounded-lg shadow-md flex flex-col gap-4"
                >
                    <Skeleton
                        variant="rectangular"
                        height={200}
                        animation="wave"
                        className="rounded-lg"
                    />

                    <Skeleton
                        variant="text"
                        height={40}
                        width="60%"
                        animation="wave"
                    />

                    <Skeleton variant="text" height={25} animation="wave" />
                    <Skeleton variant="text" height={25} width="90%" animation="wave" />
                    <Skeleton variant="text" height={25} width="80%" animation="wave" />

                    <div className="mt-4">
                        <Skeleton
                            variant="rectangular"
                            width={120}
                            height={40}
                            animation="wave"
                            className="rounded-md"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSkeleton;