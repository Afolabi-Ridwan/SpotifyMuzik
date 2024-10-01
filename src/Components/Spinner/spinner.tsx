import style from  "./spinner.module.css"

const Spinner = () => {
 
    return (
    <div className={style.spin}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Spinner;
