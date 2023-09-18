import React from 'react'

export default function NotFoundPage() {
    return (
        <div class="wrap-error">
            <div class="d-flex align-items-center h-100">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 offset-sm-2 text-center text-white">
                            <h1 class=""><span>4</span><span>0</span><span>4</span></h1>
                            <h5 class="">Oops! Page not found</h5>
                            <p class="mb-4">we are sorry, but the page you requested was not found</p>
                            <button class="btn btn-dark" href="#" title="home url">
                                Go home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
