import "../styling/ArticleForm.css"

function ArticleForm()
{
    return(
        
            <div className="parent">

                <section className="Form1">

                    <h3> What do you want to ask or share </h3>

                    <label htmlFor="title1"> Title:
                        <input type="text" 
                        id="title1" 
                        className="input"
                        placeholder="Start your question with how, what, why, etc." />
                        <br />
                    </label>

                    <label htmlFor=""> Abstract
                        
                        <br />
                         <textarea  className="abstract" id="textinput" placeholder="Enter a 1-paragraph abstract" ></textarea>

                    </label>
                    
                    <label htmlFor="textinput"> Article Text

                        <br />
                        <textarea id="textinput" placeholder="Enter a 1-paragraph abstract" ></textarea>

                    </label>


                    <label htmlFor="tags">Tags: 

                        <input type="text" 
                        className="input"
                        placeholder="Please add up to 3 tags to describe what your question is about e.g, Java"/>

                    </label>

                </section>
                
                <button className="btn">Post</button>

             </div>
      
    );
}
export default ArticleForm;