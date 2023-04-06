import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PriceTableSkeleton = ({ numRows }) => {
  const arr = new Array(numRows).fill(0);
  return (
    <table className="w-full">
      <SkeletonTheme
        width={"100%"}
        height={"100%"}
        baseColor="rgb(19 21 25)"
        highlightColor="rgb(249 115 22)"
      >
        <tbody>
          {arr.map((row, index) => (
            <tr className="w-full" key={index}>
              <td className="w-full">
                <Skeleton width={"100%"} />
              </td>
              <td className="px-8 w-full">
                <Skeleton width={"100%"} />
              </td>
            </tr>
          ))}
        </tbody>
      </SkeletonTheme>
    </table>
  );
};
