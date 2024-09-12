import { useQuery, gql } from "@apollo/client";

const query = gql`
query {
    getTodos {
      id
      userId
      user{
        name
        email
      }
  }
}
`

export default function LandingPage() {

    const { data, loading } = useQuery(query);
    if (loading) {
        return (
            <h1 style={{fontSize:"50px"}}>Loading data. Please wait... &#128519;</h1>
        )
    }
    if(!data){
        return (
            <h1 style={{fontSize:"50px"}}>Oops Something Went Wrong! &#128532;</h1>
        )
    }
    console.log(data.getTodos.length);

    return (
        <div>
            {data && (<div className="landing">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>EMAIL</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getTodos.filter((dat, index) => index <= 20).map((dat) => (

                            <tr key={dat.id}>

                                
                                <td>
                                    {dat.id}
                                </td>
                                <td>
                                    {dat.user.name}
                                </td>
                                <td>
                                    {dat.user.email}
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>)}
            
        </div>
    )
}