import Mainpic from "../../assets/womean.jpg";
function About() {
  return (
    <div className="flex items-center justify-evenly  min-h-[75vh]">
      <div className="flex justify-between  flex-col items-center gap-8 lg:items-start lg:flex-row">
        <div className="flex flex-col order-2 w-auto items-start justify-evenly gap-4 lg:w-[50%] lg:order-1">
          <h1 className="text-center w-full lg:text-start font-bold text-[3rem]">
            Our Story
          </h1>
          <p className="w-full lg:w-[80%] text-base  lg:mx-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste ipsa
            maiores accusantium natus autem porro reiciendis eaque recusandae,
            adipisci quis perferendis deleniti minus ipsum. Odio, commodi!
            Dolore, vel! Voluptas, saepe. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod quidem eum necessitatibus. Impedit
            repellendus, rerum veniam odit inventore, veritatis eaque
            repudiandae quisquam dolorum voluptates vel nobis tenetur alias!
            Quidem, pariatur. Lorem ipsum, dolor sit amet consectetur
          </p>
          <p className="w-full lg:w-[80%] text-base  lg:mx-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
            quibusdam possimus laudantium libero est doloremque repellat maxime
            facere deserunt! Ex ducimus provident quos ab mollitia excepturi
            ipsa ut nisi deserunt. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Cum qui
          </p>
        </div>
        <div className="w-auto lg:w-[45%]  h-[35rem] order-1 lg:order-2">
          <img src={Mainpic} alt="" className="w-full object-cover h-full" />
        </div>
      </div>
    </div>
  );
}

export default About;
