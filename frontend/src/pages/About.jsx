import image from '/src/images/courses/images (2).jpeg'
export default function About(){
    return(
        <div className="container">
            <h1 className="text-primary mt-3">About us</h1>
            <div className="row g-4 mb-4 p-2 align-items-center">
                <div className="col-md-6">
                    <img src={image} className="img-fluid w-100 rounded-4 shadow-sm" alt="Shelves of books in the library" />
                </div>
                <div className="col-md-6">
                    <h3>
                        Empowering Minds Through Academic Resources
                    </h3>
                    <p>
                        Welcome to the Academic Digital Knowledge Center. Our library management ecosystem is built to streamline resource sharing, catalog tracking, and student checkouts. We aim to provide an organized digital library space that bridges students with critical data assets and advanced reading materials effortlessly.
                    </p>
                </div>
            </div>
            <div className='row mb-5 mt-5'>
              <div className='col-12 col-sm-6 col-xl-3 mb-3'>
              <div className='card bg-primary text-white shadow h-100'>
                <div className='card-body'>
                    <h5>Rich Catalog</h5>
                    <p>Explore specialized academic research books.</p>
                </div>
              </div>
              </div>
              <div className='col-12 col-sm-6 col-xl-3 mb-3'>
              <div className='card bg-success text-white shadow'>
                <div className='card-body'>
                  <h5>Digital Tracking</h5>
                  <p>Up-to-date log records managed instantly.</p>
                </div>
              </div>
              </div>
              <div className='col-12 col-sm-6 col-xl-3 mb-3'>
              <div className='card bg-warning text-dark shadow'>
                <div className='card-body'>
                  <h5>Seamless Returns</h5>
                  <p>Easy book renewals and immediate checkout updates.</p>
                </div>
              </div>
              </div>
              <div className='col-12 col-sm-6 col-xl-3 mb-3'>
              <div className='card bg-danger text-white shadow'>
                <div className='card-body'>
                  <h5>Overdue Alerts</h5>
                  <p>Automated reminders for pending distributions.</p>
                </div>
              </div>
              </div>
            </div>
          </div>
    )
}