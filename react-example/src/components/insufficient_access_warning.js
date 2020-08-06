import React, { Component } from 'react'

export function insufficientAccessWarning() {
    return (
        <div>
            Warning: Access denied due to insufficient priviledges. Please contact administrators.
        </div>
    )
}