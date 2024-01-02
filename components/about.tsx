import Image from "next/image";
const About = () => {
  return (
    <div className="w-screen flex mt-20 pb-20">
      <div className="w-1/2 flex justify-center">
        <Image
          src="/assets/images/prepifyGoals.jpeg"
          alt="Image of goals"
          width={500} // Adjust the width as needed
          height={500} // Adjust the height as needed
          className="rounded object-contain md:h-max md:w-1/2"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="prose flex justify-center">
          <h2 className="text-xl mb-5">Goals</h2>
        </div>
        <div className="prose flex justify-center items-center">
          <ul className="list-none">
            <li className="text-lg">Simplify Meal preparation</li>
            <li className="text-lg de">Cooking healthy and delicious dishes</li>
            <li className="text-lg">
              No worries about planning or choosing meals
            </li>
            <li className="text-lg">Automatically created shopping list</li>
            <li className="text-lg">Free and accessible for everyone!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
