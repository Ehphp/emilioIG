import React from 'react';

function CommentList({ comments }) {


    return (
        <div>
            {comments.map(comment => (
                <div className="commentContent" key={comment.id}>
                    <div className="commentAuthor">
                        <img className='imgProfileComment'
                            src={comment.user.imgSrc}
                            alt={comment.user.username} />
                        <h4 >{comment.user.username}</h4>
                    </div>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
