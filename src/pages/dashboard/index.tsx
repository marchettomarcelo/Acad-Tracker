import { trpc } from "../../utils/trpc";

function Home() {
  const dias = trpc.dashboard.getTrainedRestSkippedDays.useQuery({
    year: 2023,
  });
  console.log(dias.data);
  return <h1>kasjdn</h1>;
}

export default Home;
