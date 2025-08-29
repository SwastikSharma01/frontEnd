import "../styling/QuestionForm.css"

function QuestionForm()
{
    return(
        
            <div className="parent">

                <section className="Form1">

                    <h3> What do you want to ask or share </h3>

                    <label htmlFor="title1"> Title:
                        <input type="text" 
                        id="title1" 
                        placeholder="Start your question with how, what, why, etc." />
                        <br />
                    </label>
                    
                    <label htmlFor="textinput"> Describe your problem 

                        <br />
                        <textarea name="" id="textinput"></textarea>

                    </label>


                    <label htmlFor="tags">Tags: 

                        <input type="text" 
                        placeholder="Please add up to 3 tags to describe what your question is about e.g, Java"/>

                    </label>

                </section>
                
                <button className="btn">Post</button>

             </div>
      
    );
}
export default QuestionForm;